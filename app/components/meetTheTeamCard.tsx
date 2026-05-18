import React, {JSX} from 'react';
import { imageSrc, type ImageImport } from '../lib/imageSrc';

type MeetTheTeamCardProps = {
    image: ImageImport;
    name: string;
    title: string;
    description: string;
    id: number;
}

export default function MeetTheTeamCard({image, name, title, description, id}: MeetTheTeamCardProps): JSX.Element {

    return (
        <div className = 'meet-the-team-card' key={id}>
            <img src={imageSrc(image)} alt="Team Member" />

            <div className = 'team-member-info'>
                <div className = 'team-member-headings'>
                    <h3>{name}</h3>
                    <h4>{title}</h4>
                </div>
                <p>{description}</p>
            </div>
        </div>
    )
}