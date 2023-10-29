
const About = () => {
  return (
    <div className="w-full md:w-[70%] lg:w-[60%] mt-32 bg-slate-400/30 grid m-auto p-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">About</h1>
        <img src="https://avatars.githubusercontent.com/u/75256709?v=4" alt="profile" className="w-32 h-32 rounded-full mt-4"/>
        <h1 className="text-xl font-semibold mt-4">Siddharth Singh</h1>
        <h1 className="text-lg font-semibold mt-2">Tampere University</h1>
        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <p>Phone: <span>01777777777</span></p>
        </div>

      </div>
      
    </div>
  );
}

export default About;