import { pri } from "../components/atom/Color"
import { HtmlPage } from "../components/atom/HtmlPage"
import { FooterGraphic } from "../components/molecule/Footer"

function ServerError({errorStatus}) {
    return (
        <HtmlPage title={`Error ${errorStatus}`} desc={`Error ${errorStatus}`}  >
            <div className="d-flex flex-column justify-content-center align-items-center h-100" >
                <p style={{ fontSize: 50, color: pri.main, fontWeight: 'bold' }}>{errorStatus}</p>
                <p className="--f-normal-regular lh-base" >{errorStatus == 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan pada sistem'}</p>
            </div>
        </HtmlPage>
    )
}

function ClientError() {
    return (
        <HtmlPage title={`Client Error`} desc={`Terjadi Kesalahan`}  >
            <div className="d-flex flex-column justify-content-center align-items-center h-100" >
                <p style={{ fontSize: 50, color: pri.main, fontWeight: 'bold' }}>Mohon Maaf</p>
                <p className="--f-normal-regular lh-base" >Sepertinya kami telah menemukan kesalahan. Kami akan segera memperbaikinya.</p>
            </div>
        </HtmlPage>
    )
}

function Error({ statusCode }) {
    return (
      <>
        {statusCode
          ? <ServerError errorStatus={statusCode} />
          : <ClientError />}

        <FooterGraphic size='big'/>
      </>
    )
  }
  
Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error