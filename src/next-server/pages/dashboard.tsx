import LayoutDashboard from "@components/layouts/layout-dashboard";
import HistoryContactsMessages from "@components/for-pages/dashboard/history-contacts-messages";
import MessagesList from "@components/for-pages/dashboard/messages-list";
import SelectedDetailsHistoryContact from "@components/for-pages/dashboard/selected-details-history-contact";

export default function Dashboard() {
 return (
  <LayoutDashboard
   gridLeft={<HistoryContactsMessages />}
   gridRight={
    <>
     <SelectedDetailsHistoryContact />
     <MessagesList />
    </>
   }
  />
 );
}
