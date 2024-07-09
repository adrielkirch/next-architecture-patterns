
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Explore Front-end Architectural Patterns
        </h1>
      </div>
      <div className="flex flex-col mt-5">
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-6xl lg:grid-cols-4 lg:text-left">
          <a
            href="/authentication/mvvm"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              MVC{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-md opacity-50">
              Explore the MVC architectural pattern, which separates{" "}
              <b>Model</b> (data), <b>View</b> (presentation), and{" "}
              <b>Controller</b> (logic) to organize your application structure
              and improve scalability.
            </p>
          </a>
          <a
            href="/authentication/mvvm"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            
           
          >
            <h2 className="mb-3 text-2xl font-semibold">
              MVVM{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-md opacity-50">
              Explore the MVVM architectural pattern, which separates{" "}
              <b>Model</b> (data), <b>View</b> (presentation), and{" "}
              <b>ViewModel</b> (logic) to enhance maintainability and
              testability in your applications.
            </p>
          </a>

          <a
            href="/authentication/mvp"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              MVP{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-md opacity-50">
              Explore the MVP architectural pattern, which separates{" "}
              <b>Model</b> (data), <b>View</b> (presentation), and{" "}
              <b>Presenter</b> (logic) to enhance maintainability and
              testability in your applications.
            </p>
          </a>

          <a
            href="/authentication/viper"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" 
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Viper{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-md opacity-50">
              Explore the VIPER architectural pattern, which stands for{" "}
              <b>View</b>, <b>Interactor</b>, <b>Presenter</b>, <b>Entity</b>,
              and <b>Router</b>. VIPER separates concerns and promotes
              scalability in large applications.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
