import {
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import HomeCarousel from "./Carousel";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <CCard className="mt-5">
      <CCardHeader>
        {t('Companyname')}
      </CCardHeader>
      <CCardBody className="text-center">
        <h1>{t('welcome-home')}</h1>
        <HomeCarousel />
      </CCardBody>
    </CCard>
  );
};

export default Home;
