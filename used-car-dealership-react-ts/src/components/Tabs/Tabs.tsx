import React, { useState } from "react";
import "./Tabs.css";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-h ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="tabs-body">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-b ${activeIndex === index ? "active" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tabs;
