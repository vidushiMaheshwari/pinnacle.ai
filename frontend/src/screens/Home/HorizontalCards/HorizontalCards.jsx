import React from "react";
import { ClassCard } from "../../../components/ClassCard/ClassCard";
import classes from './HorizontalCards.module.css';
import { UploadCard } from "../../../components/UploadCard/UploadCard";

export const HorizontalCards = (props) => {

    const cards = props.cards;

    return (
        <div className={classes.cardContainer}>
          <UploadCard />
      {cards.map((card, index) => (
        <ClassCard key={index} props={card} />
      ))}
    </div>
    )
}