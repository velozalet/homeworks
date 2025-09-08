import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import { setSettings, setLoading } from "../../../store/settingsSlice";
import { fetchSettings, updateSettings } from "../../../services/settingsService";
import type { Settings } from "../../../types/settings";

function Settings() {
    const dispatch = useDispatch<AppDispatch>();
    const allSettings = useSelector(
    (state: RootState) => state.settings.allSettings
    );
    const loading = useSelector((state: RootState) => state.settings.loading);
    const [formData, setFormData] = useState<Settings | null>(null);
    const [successMsg, setSuccessMsg] = useState("");

    // Load Settings from Firebase
    useEffect(() => {
    async function loadSettings() {
        try {
            dispatch(setLoading(true));
            const settingsArr = await fetchSettings();
            if (settingsArr.length > 0) {
                dispatch(setSettings(settingsArr[0])); // just first doc
                setFormData(settingsArr[0]);
            }
        }catch(error){
            console.error("Error loading settings:", error);
        }finally{ dispatch(setLoading(false)); }
    }
    loadSettings();
    }, [dispatch]);

    //After 4 sec. the notification`Settings updated successfully!`will br desappeard
    useEffect(() => {
        if( !successMsg ) return;
        const timer = setTimeout(
          ()=>{ return setSuccessMsg("") }, 4000 
        );

        return () => { clearTimeout(timer) }; //--> UNMOUNTS: cleans the timer 
    }, [successMsg]); 

    //Handle form field changes
    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        const { name, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSocialLinkChange = ( index:number, value:string ) => {
        setFormData( (prev) => {
            if ( !prev ) return prev;
            const updated = [...(prev.socialMediaLinks as string[])];
            updated[index] = value;
            return { ...prev, socialMediaLinks: updated };
        });
    };

    //Save updates
    const handleSave = async () => {
        if( !formData || !formData.id ) return;
        try {
            await updateSettings(formData.id as string, {
                mainTitle: formData.mainTitle,
                paginationOfPages: Number(formData.paginationOfPages),
                socialMediaLinks: formData.socialMediaLinks,
            });
            setSuccessMsg("Settings updated successfully!");
        }catch(err){
            console.error("Failed to update settings:", err);
            alert("Failed to update settings — check console.");
        }
    };
    if (loading || !formData) { return <p className="text-center">Loading...</p>;  }

  return (
    <div className="settings--page booking-car--page mt-4">
      <div className="container-lg">
        <div className="row">
          <h1 className="text-center">Settings</h1>
          <hr />

          {/*Main Title*/}
          <div className="mb-3">
            <label className="form-label text-black">Main Title</label>
            <input
              type="text"
              className="form-control"
              name="mainTitle"
              value={(formData.mainTitle as string) || ""}
              onChange={handleChange}
            />
          </div>
          {/*Main Title*/}
          {/*Pagination*/}
          <div className="mb-3">
            <label className="form-label text-black">Pagination of Pages</label>
            <input
              type="number"
              className="form-control"
              name="paginationOfPages"
              value={formData.paginationOfPages as number}
              onChange={handleChange}
            />
          </div>
          {/*Pagination*/}
          {/*Social Media Links*/}
          <div className="mb-3">
            <label className="form-label text-black">Social Media Links</label>
            {(formData.socialMediaLinks as string[]).map((link, i) => (
              <input
                key={i}
                type="url"
                className="form-control mb-2"
                value={link}
                onChange={(e) => handleSocialLinkChange(i, e.target.value)}
              />
            ))}
          </div>
          {/*Social Media Links*/}
          <div className="col-12 text-center pb-5">
            <button type="submit" className="btn btn-success" onClick={handleSave}>Save Settings</button>
          </div>
        </div>
      </div>
      {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
    </div>
  );
}
export default Settings;
