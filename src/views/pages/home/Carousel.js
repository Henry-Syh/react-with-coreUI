import {
    CCarousel,
    CCarouselItem,
    CImage,
    CCarouselCaption,
} from '@coreui/react'

import Geo from 'src/assets/images/homecarousel/geo.png'
import Geo1 from 'src/assets/images/homecarousel/geo1.png'
import { useTranslation } from "react-i18next";

const textStyle = {
    color: '#1339e6',
    fontWeight: 'bold'
};


const HomeCarousel = () => {
    const { t } = useTranslation();
    return (
        <CCarousel controls indicators dark>
            <CCarouselItem>
                <CImage className="w-25" src={Geo} alt="slide 1" />
                <CCarouselCaption className="d-md-block">
                    <h5 style={textStyle}>{t('carousel1-title')}</h5>
                    {/* <p style={textStyle}>供投資人查詢相關設備資訊</p> */}
                </CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="w-25" src={Geo1} alt="slide 2" />
                <CCarouselCaption className="d-md-block">
                    <h5 style={textStyle}>{t('carousel2-title')}</h5>
                    {/* <p style={textStyle}>供投資人購買相關資訊</p> */}
                </CCarouselCaption>
            </CCarouselItem>
        </CCarousel>
    )
}

export default HomeCarousel