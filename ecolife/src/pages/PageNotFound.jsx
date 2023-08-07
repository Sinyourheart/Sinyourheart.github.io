import PageNav from "../components/PageNav";

function PageNotFound() {
  return (
    <div>
      <PageNav />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Page not found
      </h1>
    </div>
  );
}

export default PageNotFound;
