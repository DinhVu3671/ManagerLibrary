import React from "react";
import "./HomeDesign.css";

import { Wave } from "react-animated-text";

function HomeImageContent() {
  return (
    <div className="row">
      <div className="col-lg-5 col-md-6 col-sm-12 einstein">
        
      </div>
      <div className="col-lg-7 col-md-6 col-sm-12 justify-content-center text-center">
        <div>
          <Wave
            className="text-center"
            text="Imagination is more important than your knowledge"
            speed={15}
            effect="fadeOut"
          />
        </div>
        <div>
          <Wave className="text-center" text="-Albert Einstein" speed={15} />
        </div>
      </div>
    </div>
  );
}

export default HomeImageContent;
