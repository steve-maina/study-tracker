import * as Accordion from "@radix-ui/react-accordion";
import StartSession from "./StartSession";
import SaveSession from "./SaveSession";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function SessionCreate() {
    const accordion = <Accordion.Root type="single" defaultValue="item-1" className="bg-gray-400">
        <Accordion.Item value="item-1">
            <Accordion.Trigger className="AccordionTrigger">
                <span>Start / Record a New Session Now!</span>
                <ChevronDownIcon className="AccordionChevron" />
                </Accordion.Trigger>
            <Accordion.Content className="bg-gray-200">
                <StartSession />
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
            <Accordion.Trigger className="AccordionTrigger">
                <span>Save past Session</span>
                <ChevronDownIcon className="AccordionChevron" />
            </Accordion.Trigger>
            <Accordion.Content className="bg-gray-200">
                <SaveSession />
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    return accordion
}