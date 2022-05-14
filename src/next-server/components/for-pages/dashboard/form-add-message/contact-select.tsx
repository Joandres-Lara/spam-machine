import Avatar from "@components/avatar";
import useSelectedHistoryContact from "@hooks/useSelectedHistoryContact";

export default function ContactSelect() {
 const { contact } = useSelectedHistoryContact();

 return (
  <div className="flex flex-row items-center">
   <span className="font-bold mr-2">Para:</span>
   <div>
    {" "}
    {contact ? (
     <div className="flex flex-row items-center">
      <Avatar size="mini" src={contact.avatar} />
      <>{contact.name}</>
     </div>
    ) : (
     <>Ningún contacto seleccionado</>
    )}
   </div>
  </div>
 );
}
