import Image from "next/image";

export default function Home() {
  return (
    <form action="/action_page.php">
            <input type="file" id="myFile" name="filename"/>
            <input type="submit"/>
  </form>
  );
}
