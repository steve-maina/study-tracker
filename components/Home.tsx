"use client"

import { useState } from "react";
import clsx from "clsx";
export default function Home() {
    const[backgroundColor, setBackGroundColor] = useState("green")
    function buttonClick() {
        if(backgroundColor == "green") {
            setBackGroundColor("red")
        } else {
            setBackGroundColor("green")
        }
    }
  return (
    <main className="flex justify-center items-center h-screen">
      <h1>Under Construction</h1>
    </main>
  );
}
