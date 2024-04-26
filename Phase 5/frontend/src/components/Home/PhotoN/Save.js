import './css_to_these/saved.css';
const Save = () => {
    return(
        <div className="center">

        Save PAGE PHOTON
        <div className="sidebar">
            <ul>
                <li><a href="/home/photon">All Photos</a></li>
                <li><a href="/home/photon/share" >Shared</a></li>
                <li><a href="/home/photon/save"  className='current'>Saved</a></li>
                <li><a href="/home/photon/fav">Favorites</a></li>
                <li><a href="/home/photon/album">Albums</a></li>
                <li><a href="/home/photon/lock">Locked</a></li>
                <li><a href="/home/photon/bin">Bin</a></li>
            </ul>
            </div>
            
        </div>
    )
}

export default Save;