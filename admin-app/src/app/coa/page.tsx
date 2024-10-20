"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

//Interface giống như model trong c#, định nghĩa kiểu dữ liệu
interface CatFact {
  fact: string;
  length: number;
}
export default function Home() {
  const [catFact, setCatFact] = useState<CatFact>(); //state dùng để lưu trữ dữ liệu, State có nhiều cách dùng nhưng ở đâu mình dùng kiểu dữ liệu CatFact
  const apiUrl = "https://catfact.ninja/fact"; // Lưu trữ url api để gọi dữ liệu, và tái sử dụng nhiều lần
  useEffect(() => {
    // useEffect là một hàm thực hiện một hành động nào đó khi component được render, ở đây dùng để gọi api
    async function fetch() {
      const res = await axios.get(apiUrl); // Gọi api bằng axios, axios là một thư viện giúp gọi api
      const data = await res.data; // Lấy dữ liệu trả về từ api
      setCatFact(data); // Lưu dữ liệu vào state
    }
    fetch(); // Gọi hàm fetch
  }, []);

  console.log(catFact); // In ra dữ liệu lấy được từ api, mở devtool rồi console để xem

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {/* Get started by editing{" "} */}
          <li>
            Fact:
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              {catFact?.fact}
            </code>
          </li>
          <li>Lenght: {catFact?.length}</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
