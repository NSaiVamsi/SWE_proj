import './css_to_these/shared.css';
const Share = () => {
    return(
        <div className="center">
            
        Share PAGE PHOTON
        <div className="sidebar">
            <ul>
                <li><a href="/home/photon">All Photos</a></li>
                <li><a href="/home/photon/share" className='current'>Shared</a></li>
                <li><a href="/home/photon/save">Saved</a></li>
                <li><a href="/home/photon/fav">Favorites</a></li>
                <li><a href="/home/photon/album">Albums</a></li>
                <li><a href="/home/photon/lock">Locked</a></li>
                <li><a href="/home/photon/bin">Bin</a></li>
            </ul>
            </div>
            
        </div>
    )
}

export default Share;