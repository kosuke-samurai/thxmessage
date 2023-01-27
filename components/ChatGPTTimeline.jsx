import React, { useState } from 'react';
import classes from './ChatGPTTimeline.module.css'
import { FadeIn } from './FadeIn';

const events = [
  { date: '2010-01-01', title: 'Event 1', description: 'This is the first event' },
  { date: '2012-03-01', title: 'Event 2', description: 'This is the second event' },
  { date: '2014-05-01', title: 'Event 3', description: 'This is the third event' },
];

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <>
        <div>
            {/* <Image src='/img/timeline/newspaper.png' alt="" height={80} width={400} /> */}
            <div className={classes.title}>  
                <div className={classes.title_text_box}>
                    <h1 className='text-3xl'>1993/10/18</h1>
                    <h2 className='text-2xl'>何の日</h2>
                    <div>
                        <p className={classes.title_text}>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
                    </div> 
              </div>
            </div>
        </div>
     
  <FadeIn>
    <ul className={classes.timeline}>
      {events.map((event, index) => (
        <li key={index} onClick={() => setSelectedEvent(event)}>
              <div className={classes.event_date}>{event.date}</div>
              <div className={classes.event_content}>
            <h3>{event.title}</h3>
            {selectedEvent === event && <p>{event.description}</p>}
          </div>
        </li>
      ))}
     </ul>
  </FadeIn>
</>
  );
};

