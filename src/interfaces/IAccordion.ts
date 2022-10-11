import { Ilinks } from "./Ilinks";

export interface IAccordion {
    panel: string;
    listOfLinks: Ilinks[];
    title: string;
    togglePanel: (isExpanded: boolean, panel: string) => void;
}