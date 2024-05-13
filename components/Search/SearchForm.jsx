import { useState } from "react";
import Search from "./Search";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Search.module.css";

const SearchForm = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchQuery, setSearchQuery] = useState(query || "");

  const handleSearch = (query) => {
    setSearchQuery(query);
    router.push({
      pathname: "/",
      query: { query },
    });
  };

  const handleAddMovie = () => {
    router.push("/new");
  };

  return (
    <div className={styles.searchDiv}>
      <div>
        <Link href="/new">
          <button className={styles.addMovie}>
            <b>+ADD MOVIE</b>
          </button>
        </Link>
      </div>
      <br />
      <Search searchQuery={searchQuery} onSearch={handleSearch} />
    </div>
  );
};

export default SearchForm;
