import React from 'react';
import { Trophy, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from './ui-js/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui-js/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui-js/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Autoplay from 'embla-carousel-autoplay';

export function HomePage({
  competitions,
  onNavigateToCompetition,
  onNavigateToLogin,
  onNavigateToRegister,
  currentUser,
  onLogout
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const featuredCompetitions = competitions.slice(0, 3);
  const categories = ['Science', 'Math', 'Technology', 'Arts'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <h1 className="text-blue-900">School Competitions Board</h1>
          </div>
          <div className="flex gap-2">
            {currentUser ? (
              <>
                <span className="px-4 py-2 text-gray-700">
                  {currentUser.email} ({currentUser.role})
                </span>
                <Button onClick={onLogout} className="bg-red-600 text-white hover:bg-red-700 shadow-sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onNavigateToLogin} className="border border-blue-200 text-blue-700 hover:bg-blue-50">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button onClick={onNavigateToRegister} className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {featuredCompetitions.map((competition) => (
                <CarouselItem key={competition.id}>
                  <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600" style={{ aspectRatio: '21/9' }}>
                    <ImageWithFallback
                      src={competition.imageUrl}
                      alt={competition.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                      <h2 className="text-white mb-4">{competition.title}</h2>
                      <p className="max-w-2xl mb-6 text-lg">
                        {competition.description}
                      </p>
                      <Button
                        size="lg"
                        onClick={() => onNavigateToCompetition(competition.id)}
                        className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg px-8"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-center mb-8 text-gray-800">Competition Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categoryCompetitions = competitions.filter(c => c.category === category);
            const categoryImage = categoryCompetitions[0]?.imageUrl || '';

            return (
              <Card
                key={category}
                className="cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full overflow-hidden rounded-b-none" style={{ aspectRatio: '16/9' }}>
                  <ImageWithFallback
                    src={categoryImage}
                    alt={category}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    {categoryCompetitions.length} active competition{categoryCompetitions.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Explore exciting {category.toLowerCase()} competitions
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      if (categoryCompetitions.length > 0) {
                        onNavigateToCompetition(categoryCompetitions[0].id);
                      }
                    }}
                  >
                    View Competitions
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* All Competitions */}
        <div className="mt-16">
          <h2 className="text-center mb-8 text-gray-800">All Competitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((competition) => (
              <Card
                key={competition.id}
                className="cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                onClick={() => onNavigateToCompetition(competition.id)}
              >
                <div className="relative w-full overflow-hidden rounded-b-none" style={{ aspectRatio: '16/9' }}>
                  <ImageWithFallback
                    src={competition.imageUrl}
                    alt={competition.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{competition.title}</CardTitle>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {competition.category}
                    </span>
                  </div>
                  <CardDescription>Deadline: {competition.deadline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{competition.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-600">{competition.prize}</span>
                    <span className="text-gray-500">Max {competition.maxTeamSize} members</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 School Competitions Board. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
