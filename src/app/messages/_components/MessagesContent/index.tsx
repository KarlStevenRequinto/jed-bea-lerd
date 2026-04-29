"use client";

import { useMessagesContentViewModel } from "./useViewModel";
import MessagesSidebar from "../MessagesSidebar";
import InboxPanel from "../InboxPanel";
import ChatPanel from "../ChatPanel";
import PromotedListingsSidebar from "../PromotedListingsSidebar";

const MessagesContent = () => {
    const {
        filteredConversations,
        selectedConversationId,
        selectedConversation,
        currentMessages,
        newCount,
        inboxSearch,
        setInboxSearch,
        inputValue,
        setInputValue,
        handleSendMessage,
        selectConversation,
    } = useMessagesContentViewModel();

    return (
        <div className="flex flex-1 overflow-hidden">
            <MessagesSidebar />
            <InboxPanel
                conversations={filteredConversations}
                selectedId={selectedConversationId}
                search={inboxSearch}
                newCount={newCount}
                onSearch={setInboxSearch}
                onSelect={selectConversation}
            />
            <ChatPanel
                conversation={selectedConversation}
                messages={currentMessages}
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSend={handleSendMessage}
            />
            <PromotedListingsSidebar />
        </div>
    );
};

export default MessagesContent;
