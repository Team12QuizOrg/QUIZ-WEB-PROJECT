import { useState } from 'react'
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import Slider1 from './Slider1/Slider1'
import Slider2 from './Slider2/Slider2'
import Slider3 from './Slider3/Slider3'

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default function SliderHome () {
  const [slider, setSlider] = useState()
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })

  return (
        <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>

            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            <IconButton
                aria-label={'left-arrow'}
                variant={'ghost'}
                position={'absolute'}
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            <IconButton
                aria-label={'right-arrow'}
                variant={'ghost'}
                position={'absolute'}
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt size={'40px'} />
            </IconButton>
            <Slider {...settings} ref={(slider) => setSlider(slider)}>

                <Slider1></Slider1>
                <Slider2></Slider2>
                <Slider3></Slider3>

            </Slider >
        </Box >
  )
}
