import LayoutDashboard from "@components/layouts/layout-dashboard";
import HistoryContactsMessages from "@components/for-pages/dashboard/history-contacts-messages";
import MessagesList from "@components/for-pages/dashboard/messages-list";
import SelectedDetailsHistoryContact from "@components/for-pages/dashboard/selected-details-history-contact";
import FormAddContact from "@components/for-pages/dashboard/form-add-contact";

export default function DashboardAddContact() {
 return (
  <LayoutDashboard
   gridLeft={<HistoryContactsMessages />}
   gridRight={
    <>
     <SelectedDetailsHistoryContact />
     <MessagesList />
     <FormAddContact />
    </>
   }
  />
 );
}
