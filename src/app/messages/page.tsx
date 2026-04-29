import MessagesNavbar from "./_components/MessagesNavbar";
import MessagesContent from "./_components/MessagesContent";

const MessagesPage = () => {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-white">
            <MessagesNavbar />
            <MessagesContent />
        </div>
    );
};

export default MessagesPage;
