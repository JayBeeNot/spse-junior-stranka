import { Splide, SplideSlide,} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import  './carousel.css';

const Carousel = () => {
    return(
        <>
            <Splide options={{
                type: 'loop',
                perPage: 1,
                autoplay: true,
                interval: 3000,
                pauseOnHover: false,
                resetProgress: false,
            }} 
            aria-label="SPSE"  >
                <SplideSlide>
                        <img src="/tyler.jpg" alt="slide 1"/>
                </SplideSlide>
                <SplideSlide>
                    <img src="/i_love_you_tyler.jpg" />
                </SplideSlide>
            </Splide>
        </>
    )
}

export default Carousel