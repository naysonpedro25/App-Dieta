import { useRouteError, isRouteErrorResponse} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
console.log("ondonfipnisobvoriowfiobwrifgiowrogvar[]")
  return (
    <div id="error-page " className="bg-slate-600">
      <h1 className="text-black">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : "Erro desconhecido"}</i>
      </p>
    </div>
  );
}
