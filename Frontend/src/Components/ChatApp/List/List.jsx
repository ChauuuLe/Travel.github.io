import ChatList from "./ChatList/ChatList"
import "./list.css"
import Userinfo from "../../../pages/UserInfo/Userinfo"

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