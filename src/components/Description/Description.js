import React from "react";
import { Typography } from "antd";

import "./Description.styles.css";

const { Paragraph } = Typography;

const Description = () => {
  return (
    <>
      <Paragraph
        className="description"
        ellipsis={{ ellipsis: false, expandable: false, rows: 7 }}
      >
        A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts
        to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high school basketball
        team at his alma mater. When we see goldfish in the lead actor’s son’s room, we were on set to make sure the
        goldfish were taken care of. The tank was setup with a biofilter and conditioned water. The fish was brought in
        a plastic bag and placed in a setup tank to acclimate to the temp of the tank. After they filmed the scene, they
        took the fish back to the store from where they were from.
      </Paragraph>
    </>
  );
};

export default Description;
