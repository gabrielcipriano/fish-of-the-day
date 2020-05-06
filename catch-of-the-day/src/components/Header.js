import React from 'react';

//Stateless Functional components
//(arrow function with implicit return)
const Header = props => (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">Of</span>
          <span className="The">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
)
//components in general uses class:
// class Header extends React.Component {
//   render() {
//     return(
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">Of</span>
//             <span className="The">the</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

export default Header;