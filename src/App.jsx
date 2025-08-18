import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import OnboardingPage from "./pages/OnBoarding";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Map from "./pages/Map";
import BottomNav from "./components/BottomNav";
import TopNav from "./components/TopNav";
import ChatPage from "./pages/chatPage/ChatPage";
import ChatRoomPage from "./pages/chatPage/ChatRoomPage";
import ChatRoomBuyPage from "./pages/chatPage/ChatRoomBuyPage";
import ChatRoomFinalPage from "./pages/chatPage/ChatRoomFinalPage";
import PostingDetailPage from "./pages/post/PostingDetailPage";
import PostingCreatePage from "./pages/post/PostingCreatePage";
function App() {
  const location = useLocation();
  // 바텀nav바를 숨길 경로들
  const hideBottomNavPaths = [
    "signup",
    "/login",
    "/chat/room/buy",
    "/chat/room/final",
    "/post/create",
    "/post/detail",
  ];
  // 탑nav바를 숨길 경로들
  const hideTopNavPaths = [
    "/login",
    "signup",
    "/chat/room/final",
    "/post/create",
  ];

  // BottomNav
  const shouldHideBottomNav =
    location.pathname === "/" ||
    hideBottomNavPaths.some((path) => location.pathname.startsWith(path));

  // TopNav
  const shouldHideTopNav =
    location.pathname === "/" ||
    hideTopNavPaths.some((path) => location.pathname.startsWith(path));
  return (
    <>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/room/:id" element={<ChatRoomPage />} />
        <Route path="/chat/room/buy/:id" element={<ChatRoomBuyPage />} />
        <Route path="/chat/room/final" element={<ChatRoomFinalPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/post/detail/:id" element={<PostingDetailPage />} />
        <Route path="/post/create" element={<PostingCreatePage />} />
      </Routes>
      {!shouldHideBottomNav && <BottomNav />}
      {!shouldHideTopNav && <TopNav />}
    </>
  );
}

export default App;
