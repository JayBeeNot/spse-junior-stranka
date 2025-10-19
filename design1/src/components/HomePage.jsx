import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Globe, Database, Brain, Trophy, Calendar, Users } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';


};

const carouselImages = [
  {
    url=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNjcxNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Pripoj sa k súťaži',
    subtitle: 'Vyskúšaj si svoje schopnosti na reálnych problémoch'
  },
  {
    url=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwbGlicmFyeSUyMHN0dWR5fGVufDF8fHx8MTc2MDY4NjI4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Uč sa a rastaj',
    subtitle: 'Rozvíjaj svoje zručnosti v praxi'
  },
  {
    url=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDYyNTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Náš kampus',
    subtitle: 'Moderné priestory pre vzdelávanie'
  },
  {
    url=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHRlYW13b3JrfGVufDF8fHx8MTc2MDY5NTY3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Tímová práca',
    subtitle: 'Spolupracuj s talentovanými kolegami'
  }
];


  description: string;
  fullDescription: string;
  deadline: string;
  prizes: string[];
  teamSize: string;
  icon: typeof Code;
  color: string;
};

const competitions= [
  {
    title: 'Algoritmická výzva',
    description: 'Otestuj si svoje schopnosti riešenia problémov',
    fullDescription: 'Súťaž v sérii algoritmických výziev navrhnutých na testovanie tvojich schopností riešenia problémov, znalosti dátových štruktúr a efektivity kódovania. Od klasických algoritmov po pokročilé optimalizačné problémy - táto súťaž posunie tvoje limity a pomôže ti rásť ako vývojárovi.',
    deadline,
    prizes: 1 000 €', '2. miesto: 500 €', '3. miesto: 250 €'],
    teamSize: '1-3 členovia',
    icon,
    color
  },
  {
    title: 'Webový vývoj',
    description: 'Vytvor moderné webové aplikácie a ukáž svoju kreativitu',
    fullDescription: 'Vytvor inovatívne webové aplikácie pomocou najnovších technológií. Či už ide o sociálnu platformu, produktivitný nástroj alebo kreatívnu prezentáciu, predveď svoje full-stack vývojárske zručnosti, UI/UX dizajnérske schopnosti a kreativitu pri budovaní aplikácií zameraných na používateľa.',
    deadline,
    prizes: 1 500 €', '2. miesto: 750 €', '3. miesto: 350 €'],
    teamSize: '1-4 členovia',
    icon,
    color
  },
  {
    title: 'Dátová veda',
    description: 'Analyzuj dáta a vytváraj poznatky pomocou strojového učenia',
    fullDescription: 'Ponor sa do reálnych datasetov a extrahuj zmysluplné poznatky pomocou štatistickej analýzy, vizualizácie dát a techník strojového učenia. Vytvor prediktívne modely, kreatívne vizualizácie a prezentuj svoje zistenia spôsobom, ktorý podporuje rozhodovanie.',
    deadline,
    prizes: 1 200 €', '2. miesto: 600 €', '3. miesto: 300 €'],
    teamSize: '1-3 členovia',
    icon,
    color
  },
  {
    title: 'AI & Strojové učenie',
    description: 'Vyvíjaj inteligentné systémy a neurónové siete',
    fullDescription: 'Posuň hranice umelej inteligencie vývojom inovatívnych AI riešení. Od počítačového videnia po spracovanie prirodzeného jazyka - vytvor inteligentné systémy, ktoré riešia reálne problémy pomocou najmodernejších techník strojového a hlbokého učenia.',
    deadline,
    prizes: 2 000 €', '2. miesto: 1 000 €', '3. miesto: 500 €'],
    teamSize: '1-4 členovia',
    icon,
    color
  }
];

export function HomePage({ setCurrentPage }) {
  const plugin = React.useRef(
    Autoplay({ delay, stopOnInteraction)
  );
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCompetitionClick = (competition) => {
    setSelectedCompetition(competition);
    setDialogOpen(true);
  };

  const handleRegister = () => {
    setDialogOpen(false);
    setCurrentPage('register');
  };

  return (
    <div className="min-h-screen">
      {/* Full-screen Carousel */}
      <div className="h-screen relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-screen">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="h-screen">
                <div className="relative h-full w-full">
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <h1 className="text-6xl mb-4">{image.title}</h1>
                      <p className="text-2xl">{image.subtitle}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Competitions Section */}
      <div className="max-w-7xl mx-auto px-4 sm
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Naše súťaže</h2>
          <p className="text-xl text-gray-600">Vyber si svoju výzvu a začni súťažiť</p>
        </div>

        <div className="grid grid-cols-1 md
          {competitions.map((competition, index) => {
            const Icon = competition.icon;
            return (
              <Card 
                key={index} 
                className="hover
                onClick={() => handleCompetitionClick(competition)}
              >
                
                  <div className={`w-14 h-14 ${competition.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="group-hover
                  {competition.description}</CardDescription>
                </CardHeader>
                
                  <button
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-4 rounded-lg hover
                  >
                    Zistiť viac
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Competition Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCompetition && (
            
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 ${selectedCompetition.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <selectedCompetition.icon className="h-8 w-8 text-white" />
                  </div>
                  
                    <DialogTitle className="text-2xl">{selectedCompetition.title}</DialogTitle>
                    <DialogDescription className="text-base mt-1">
                      {selectedCompetition.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                
                  <h3 className="text-lg mb-2 text-gray-900">O tejto súťaži</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCompetition.fullDescription}</p>
                </div>

                <div className="grid grid-cols-1 md
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-700" />
                      <h4 className="text-gray-900">Termín</h4>
                    </div>
                    <p className="text-gray-700">{selectedCompetition.deadline}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-purple-700" />
                      <h4 className="text-gray-900">Veľkosť tímu</h4>
                    </div>
                    <p className="text-gray-700">{selectedCompetition.teamSize}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 p-5 rounded-xl border-2 border-yellow-300 shadow-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <Trophy className="h-6 w-6 text-yellow-700" />
                    <h4 className="text-gray-900">Ceny</h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedCompetition.prizes.map((prize, idx) => (
                      <li key={idx} className="text-gray-700 flex items-center space-x-3">
                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></span>
                        {prize}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={handleRegister}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover
                  >
                    Registrovať sa
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage('login')}
                    className="flex-1 border-2"
                  >
                    Už mám účet
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
