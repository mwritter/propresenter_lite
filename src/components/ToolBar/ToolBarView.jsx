import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdFormatSize,
  MdDashboard,
  MdPlayArrow,
  MdEdit,
  MdTextRotationNone,
  MdSlideshow,
  MdMoreHoriz,
  MdTimer,
  MdSend,
  MdLayers,
  MdPerson,
  MdShoppingCart,
  MdImage,
} from "react-icons/md";

// TODO: these should all be seperate components
// and still need to add functionality
const ToolBarView = () => {
  const navigate = useNavigate();
  return (
    <section
      className="h-[75px] bg-neutral-700 grid px-10 space-x-12 grid-cols-3 items-center"
      style={{
        gridArea: "ToolBar",
        gridTemplateColumns: "auto 1fr auto",
      }}
    >
      {/* col 1 */}
      <div className="contorl-group-one flex space-x-4">
        <div className="flex space-x-4">
          <div>
            <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400 ">
              <MdSearch />
            </button>
            <p className="text-[.6em] text-center opacity-60">Search</p>
          </div>
          <div className="flex">
            <div>
              <button className="bg-zinc-500 px-5 py-1 rounded-l-[10%] border-r-2 border-black hover:bg-zinc-400">
                <MdFormatSize />
              </button>
              <p className="text-[.6em] text-center opacity-60">Text</p>
            </div>
            <div>
              <button className="bg-zinc-500 px-5 py-1 rounded-r-[10%] hover:bg-zinc-400">
                <MdDashboard />
              </button>
              <p className="text-[.6em] text-center opacity-60">Theme</p>
            </div>
          </div>
        </div>

        {/* col 2 */}
        <div className="contorl-group-two flex justify-start">
          <div>
            <button className="bg-zinc-500 px-5 py-1 rounded-l-[10%] border-r-2 border-black hover:bg-zinc-400">
              <MdPlayArrow />
            </button>
            <p className="text-[.6em] text-center opacity-60">Show</p>
          </div>
          <div>
            <button className="bg-zinc-500 px-5 py-1 border-r-2 border-black hover:bg-zinc-400">
              <MdEdit />
            </button>
            <p className="text-[.6em] text-center opacity-60">Edit</p>
          </div>
          <div>
            <button
              onClick={() => navigate("/verses")}
              className="bg-zinc-500 px-5 py-1 border-r-2 border-black hover:bg-zinc-400"
            >
              <MdTextRotationNone />
            </button>
            <p className="text-[.6em] text-center opacity-60">TBD</p>
          </div>
          <div>
            <button className="bg-zinc-500 px-5 py-1 border-r-2 border-black hover:bg-zinc-400">
              <MdSlideshow />
            </button>
            <p className="text-[.6em] text-center opacity-60">TBD</p>
          </div>
          <div>
            <button className="bg-zinc-500 px-5 py-1 rounded-r-[10%] hover:bg-zinc-400">
              <MdMoreHoriz />
            </button>
            <p className="text-[.6em] text-center opacity-60">More</p>
          </div>
        </div>
      </div>

      {/* col 3 */}
      <div className="contorl-group-three flex space-x-1 flex-1 justify-center">
        <div>
          <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400">
            <MdTimer />
          </button>
          <p className="text-[.6em] text-center opacity-60">Timers</p>
        </div>
        <div>
          <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400">
            <MdSend />
          </button>
          <p className="text-[.6em] text-center opacity-60">Messages</p>
        </div>
        <div>
          <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400">
            <MdLayers />
          </button>
          <p className="text-[.6em] text-center opacity-60">Pages</p>
        </div>
        <div>
          <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400">
            <MdPerson />
          </button>
          <p className="text-[.6em] text-center opacity-60">Stage</p>
        </div>
      </div>

      <div className="contorl-group-four flex space-x-1 justify-end">
        <div>
          <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400">
            <MdShoppingCart />
          </button>
          <p className="text-[.6em] text-center opacity-60">Shop</p>
        </div>
        <div>
          <button className="bg-zinc-500 px-5 py-1 rounded-[10%] hover:bg-zinc-400">
            <MdImage />
          </button>
          <p className="text-[.6em] text-center opacity-60">Media</p>
        </div>
      </div>
    </section>
  );
};

export default ToolBarView;
