import ChatList from "./chatList/ChatList"
import "./list.css"
import Userinfo from "../../../pages/userInfo/Userinfo"

const List = (props) => {
  const {
    setChatId,
  } = props;

  return (
    <div className="list">
      <ChatList setChatId={setChatId} />
    </div>
  );
}

export default List