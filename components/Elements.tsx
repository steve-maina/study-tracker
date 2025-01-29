import { SaveDialogProps } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useState } from "react";

type buttonTypes = "submit" | "reset" | "button";

export default function FormButtons({
  type,
  children,
  disabled = false,
  onClick,
}: {
  type: buttonTypes;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="w-24 text-black border-2 border-gray-600 px-4 py-1 rounded-md bg-slate-300 disabled:text-gray-400"
    >
      {children}
    </button>
  );
}
export function SaveDialog(props: SaveDialogProps) {
  function submit() {
    props.formRef.current?.requestSubmit();
  }
  return (
    <Dialog.Root open={props.open} onOpenChange={props.setOpen}>
      <Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-45" />
        <Dialog.Content className="fixed left-1/2 top-1/2 bg-white -translate-x-1/2 -translate-y-1/2 rounded-2xl py-8 px-12">
          <Dialog.Title className="pb-6 flex justify-center">
            Save Study Session
          </Dialog.Title>
          <div>
            <h2>Add Details for your study session</h2>
            <label className="block mx-2 mt-4 pb-2" htmlFor="topic">
              Topic
            </label>
            <input
              id="topic"
              required
              type="text"
              className="text-white bg-gray-300 focus:bg-gray-400 ml-2 rounded-md px-1 py-2 w-full"
              value={props.topic}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setTopic(event.target.value);
              }}
            />

            {props.operation === "save" ? (
              <>
                <label className="block mx-2 mt-4 pb-2" htmlFor="date">
                  {" "}
                  Date:
                </label>
                <input
                  required
                  id="date"
                  type="date"
                  className="bg-gray-300 focus:bg-gray-400 ml-2 mb-4 p-2 rounded-md block w-full"
                  value={props.date}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value) {
                      props.setDate(event.target.value);
                    }
                  }}
                />

                <label>
                  Start Time
                  <input
                    required
                    type="time"
                    value={props.startTime}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      props.setStartTime(event.target.value);
                    }}
                    className="py-4  border border-gray-400 rounded-md w-36 p-6"
                  />
                </label>
                <label className="pl-4">
                  End Time
                  <input
                    required
                    className="py-4  border border-gray-400 rounded-md w-36 p-6"
                    type="time"
                    value={props.endTime}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      props.setEndTime(event.target.value);
                    }}
                  />
                </label>
              </>
            ) : undefined}
          </div>
          <div className="flex justify-end mt-8">
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={submit}
                className="hover:text-black text-gray-500 border border-gray-400 rounded-md px-4 py-2 bg-green-200 hover:bg-green-400"
              >
                Save
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                type="button"
                className="hover:text-black text-gray-500 border border-gray-400 rounded-md px-4 py-2 bg-red-200 hover:bg-red-400 ml-4"
              >
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
