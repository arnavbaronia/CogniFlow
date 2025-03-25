import React, { FunctionComponent } from "react";
import { TemplateEnum } from "@/lib/prompt-by-template";

interface ITemplate {
  label: string;
  value: TemplateEnum;
}

export const templates: ITemplate[] = [
  { label: "Flowchart", value: TemplateEnum.FLOWCHART },
  { label: "Mindmap", value: TemplateEnum.MINDMAP },
  { label: "Timeline", value: TemplateEnum.TIMELINE },
  { label: "User Journey", value: TemplateEnum.USERJOURNEY },
  { label: "Entity Relationship", value: TemplateEnum.ENTITYRELATIONSHIP },
  { label: "Sequence Diagram", value: TemplateEnum.SEQUENCE },
  { label: "State Diagram", value: TemplateEnum.STATE },
];

interface ISelectTemplate {
  value: TemplateEnum;
  onChange: (value: TemplateEnum) => void;
}

const SelectTemplate: FunctionComponent<ISelectTemplate> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TemplateEnum)}
      className="select select-bordered select-lg w-full mt-2"
    >
      {templates.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SelectTemplate;