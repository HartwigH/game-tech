/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const Home: NextPage = () => {
  const [game, setGame] = useState('');
  // const [cover, setCover] = useState('');
  const [input, setInput] = useState('');

  const fetchResults = async (raw: string) => {
    const response = await fetch('/api/search-game-db', {
      method: 'POST',
      body: raw,
    });
    return response.json();
  };

  const { data, isLoading } = useQuery(['searchedGame', game], () => fetchResults(game));
  // console.log(data?.[0]);

  const handleSubmit = (e: any) => {
    setGame(input);
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Game tech</title>
        <meta name="description" content="Game tech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container mx-auto">
        <div className="py-10">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Try searching for a game!
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
            <div className="flex w-full sm:max-w-xs">
              <label className="sr-only" htmlFor="search">
                Search
              </label>
              <input
                className="px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                type="search"
                id="search"
                value={input}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              <button
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="pt-10">
          <h2 className="text-xl font-bold">Matched results from API:</h2>
          {isLoading ? (
            <span>Loading results...</span>
          ) : (
            <ul className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data?.map((result: any) => (
                <li key={result.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                /> */}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={result.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {result.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">rpg</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">0.0</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
