import { LocaleConsumer } from "../contexts/LocaleContext";

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <LocaleConsumer>
        {
          ({ locale }) => {
            
           
            return (

              
              new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-EN', options) 
              
              
              
            )
           
          }
        }  
    </LocaleConsumer>
  )
}


export { showFormattedDate };
