import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';




const Carousel = () => {


    const splideOptions = () =>{
        type:"loop",
        perPage; 1,
        perMove; 1
    };

    return(
        <>
            <Splide aria-label="My Favorite Images" options={splideOptions} >
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