import React from 'react'
import styled from 'styled-components'
import ProgressBar from '../../additionalstuff/ProgressBar'
import '../../CSS/prog.css'
// function StaticProgress() {
//     return (
//         <Container>
//             <EventsPart><div>Depend on user intrests </div>
//             <div>**progress goal : cheamin : i want to learn web : chemin a-z</div>        
//             <div>**i wnat to work as a frontend dev : guide for the frontend dev</div>
//                 <div>**in same time we can match our users - who seeks to learn to get a job - 
//                     with entreprises which search for employees </div>
//             </EventsPart>
//             <ProgressPart>
               
//             </ProgressPart>
//         </Container>
//     )
// }

// <EventsPart>
// <div>events </div>
// <div>progress goal : cheamin : i want to learn web : chemin a-z</div>
// <div>job </div>
// </EventsPart>

// export default StaticProgress
const items = [
	{
		name: 'Step 1',
		active: true,
	},
	{
		name: 'Step 2',
		active: true,
	},
	{
		name: 'Step 3',
		active: true,
	},
	{
		name: 'Step 4',
		active: false,
	}
]


function StaticProgress() {
  return (
    <>
      <Container>
       
        <ProgressPart>
        
        <div className="timeline">
			<div className="timeline-progress"></div>
			<div className="timeline-items">
				{items.map((item, i) => (
					<div key={i} className={"timeline-item" + (item.active ? ' active' : '')}>
						<div className="timeline-content">
							{item.name}
						</div>
					</div>
				))}
			</div>
            
		</div>
        
        </ProgressPart>
      </Container>
    </>
  );
}

export default StaticProgress;
// lllll
// here is his stats : 
// - time : how much he passed using the chatbot
// - level : 
// - finished : how many trophies -finshed courses- he got 
// lllll
// here is the progress of the user 
// like coursera with a button to view all

const Container = styled.div`
width: 100%;
height: 100%;
grid-template-rows: 50% auto ;
`

const ProgressPart = styled.div`
`

const EventsPart = styled.div`
position:relative;
height:50%;
background:orange;
`