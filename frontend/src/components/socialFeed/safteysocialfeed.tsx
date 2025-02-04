// import * as React from "react";
// import { Header } from "./Header";
// import { SearchBar } from "./SearchBar";
// import { Story } from "./Story";
// import { Post } from "./Post";
// import { Navigation } from "./Navigation";

// export const SocialFeed: React.FC = () => {
//   const [stories] = React.useState([
//     {
//       imageUrl:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/6093fa78a5975dce5cacdd69f3dc074d8a56ed1eef07c3b930dd6fa85cb956fe?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//       name: "Your Story",
//     },
//     {
//       imageUrl:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//       name: "Dr. Mahesh",
//     },
//     {
//       imageUrl:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/b527f110a2eb672ae9e0b0bead1abbd22bc9bc28130e5503cc3abf13d16bee60?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//       name: "Dr. Swathi",
//     },
//     {
//       imageUrl:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//       name: "Dr. Mahesh",
//     },
//     {
//       imageUrl:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/e11116406a9a6bca6e5c1de6ab87ff490cd336445d55d98097f72dbe60e3241d?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//       name: "Dr. Swathi",
//     },
//   ]);

  
   

//   const handleSearch = (query: string) => {
//     console.log("Searching for:", query);
//   };

//   const handleAddPost = () => {
//     console.log("Adding new post");
//   };

//   return (
//     <div className="flex flex-col min-h-screen max-w-[480px] mx-auto ">
//       <Header
//         onNotification={() => console.log("Notification clicked")}
//         onMessage={() => console.log("Message clicked")}
//         onProfile={() => console.log("Profile clicked")}
//       />


//       <div className="flex gap-2 px-5 py-3 overflow-x-auto">
//         {stories.map((story, index) => (
//           <Story
//           key={index}
//           {...story}
//           onClick={() => console.log(`Story ${index} clicked`)}
//           />
//         ))}
//       </div>
//         <SearchBar onSearch={handleSearch} onAddPost={handleAddPost} />

//       <div className="flex-1 px-5 py-3 space-y-4 mb-16">
//         <Post
//           avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
//           name="Nampally Sriram"
//           bio="Ophthalmologist | AIIMS Delhi'25 | Asp"
//           timeAgo="3 days ago"
//           title="Ophthalmology: The Future of Eye Care"
//           content="Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. The field continues to evolve with new technologies and treatment methods, promising better outcomes for patients."
//           images={[
//             "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//             "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//             "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//             "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//           ]}
//           likes={120}
//           comments={64}
//           shares={37}
//           reposts={51}
//           onLike={() => console.log("Like clicked")}
//           onComment={() => console.log("Comment clicked")}
//           onShare={() => console.log("Share clicked")}
//           onRepost={() => console.log("Repost clicked")}
//           onMoreOptions={() => console.log("More options clicked")}
//         />
//       </div>

//       <Navigation  />
//     </div>
//   );
// };