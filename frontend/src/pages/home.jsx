import React from "react";
import Header from "../components/header";
import SpecialityMenu from "../components/specialityMenu";
import TopDoctors from "../components/topDoctors";
import Banner from "../components/banner";

const Home = () => {
    return(
        <div>
            <Header/>
            <SpecialityMenu/>
            <TopDoctors/>
            <Banner/>
        </div>
    )
}
export default Home;