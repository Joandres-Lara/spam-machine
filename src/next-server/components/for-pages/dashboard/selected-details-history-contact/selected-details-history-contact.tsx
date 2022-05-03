import useSelectedHistoryContact from "@hooks/useSelectedHistoryContact";
import Avatar from "@components/avatar";
import Badged from "@components/badged";
import Text from "@components/ui/text";
import classes from "./selected-details-history.module.css";
import Link from "next/link";
import StyledLink from "@components/ui/link";

export default function SelectedDetailsHistoryContact() {
 const selectedHistoryContact = useSelectedHistoryContact();

 return (
  <div className={classes.select_details_history}>
   <div className="bg-white shadow-sm p-3 rounded-bl-xl w-full flex flex-row justify-between">
    <div className="flex flex-row items-center">
     <Avatar size="sm" src={selectedHistoryContact.avatar} />
     <Text className="ml-2 font-bold" variant="small">
      {selectedHistoryContact.name}
     </Text>
    </div>
    <div className="flex flex-row items-center">
     <Badged>{selectedHistoryContact.messages_count}</Badged>
     <Text variant="small" className="ml-3">
      Mensajes
     </Text>
     <Link href={`/dashboard/sending/${selectedHistoryContact.contact_id}/details`} passHref>
      <StyledLink variant="small" className="ml-7">
       Detalles
      </StyledLink>
     </Link>
     <Link href="/api/auth/logout" passHref>
      <StyledLink variant="small" className="ml-7">
       Salir
      </StyledLink>
     </Link>
    </div>
   </div>
  </div>
 );
}
