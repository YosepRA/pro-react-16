import React from 'react';

// export function ProFeature(FeaturedComponent) {
//   return function (props) {
//     if (props.pro) {
//       const { pro, ...childProps } = props;
//       return <FeaturedComponent {...childProps} />;
//     } else {
//       return (
//         <h5 className="bg-warning text-white text-center">
//           This is a Pro Feature
//         </h5>
//       );
//     }
//   };
// }

export const ProFeature = props => {
  if (props.pro) return props.render('Pro Feature');
  else {
    return (
      <h5 className="bg-warning text-white text-center">
        This is a Pro Feature
      </h5>
    );
  }
};
