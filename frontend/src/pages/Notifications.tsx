import TopNavbar from "@/components/TopNavbar";
import profilepic from "../assets/ProfilePic.svg";

function Notifications() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />

      <div className="container mx-auto flex flex-row  max-w-7xl h-[85vh] pt-20 gap-8 ">
        <div className="hidden lg:block lg:w-[25%] ">
          <div className="sticky top-20">
            <div className="bg-white max-w-xs w-full rounded-xl p-4 ">
              <div className="flex flex-col">
                <p className="font-semibold text-lg px-4 ">
                  Filter Notifications
                </p>

                <div className="flex flex-col mt-3  p-2 rounded-md">
                  <p className="w-full ps-2 py-2 text-sm font-semibold bg-gray-100 rounded-s-lg cursor-pointer border-r-2 border-r-main ">
                    Follow Friends
                  </p>

                  <p className="w-full ps-2 py-2 text-sm text-gray-600 font-semibold cursor-pointer hover:bg-gray-50">
                    Followers & Following
                  </p>

                  <p className="w-full ps-2 py-2 text-sm text-gray-600 font-semibold cursor-pointer hover:bg-gray-50">
                    Groups
                  </p>

                  <p className="w-full ps-2 py-2 text-sm text-gray-600 font-semibold cursor-pointer hover:bg-gray-50">
                    Societies & Clubs
                  </p>

                  <p className="w-full ps-2 py-2 text-sm text-gray-600 font-semibold cursor-pointer hover:bg-gray-50">
                    Organisations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%] h-full ">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row p-4 bg-white items-center w-full gap-6 shadow-lg">
              <div className="rounded-full h-12 w-12">
                <img src={profilepic} alt="profile pic" />
              </div>

              <div className="flex flex-grow">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-semibold">
                    this is the head of the notification
                  </p>
                  <p className="text-sm">
                    Here we will have the notification content
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-600 text-sm">1d</p>
              </div>
            </div>

            <div className="flex flex-row p-4 bg-white items-center w-full gap-6 shadow-lg">
              <div className="rounded-full h-12 w-12">
                <img src={profilepic} alt="profile pic" />
              </div>
              <div className="flex flex-grow">
                <div className="flex flex-col justify-center">
                  <p className="text-base font-semibold">
                    this is the head of the notification
                  </p>
                  <p className="text-sm">
                    Here we will have the notification content
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-600 text-sm">1d</p>
              </div>
            </div>

            <div className="flex flex-row p-4 bg-white items-center w-full gap-6 shadow-lg">
              <div className="rounded-full h-12 w-12">
                <img src={profilepic} alt="profile pic" />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-base font-semibold">
                  this is the head of the notification
                </p>
                <p className="text-sm">
                  Here we will have the notification content
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[25%] h-full"></div>
      </div>
    </div>
  );
}

export default Notifications;
