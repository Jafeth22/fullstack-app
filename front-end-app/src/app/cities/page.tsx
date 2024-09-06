import Cities from "@/components/cities/cities";
import { FC } from "react";
import './page.style.css';

const CitiesPage: FC = () => {
    return (
        <div  className="city-wrapper">
            <Cities />
        </div>
    );
}

export default CitiesPage;