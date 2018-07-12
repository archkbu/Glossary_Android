package templateprj.ulip.hkbu.com.templateproject;

import org.json.JSONArray;
import org.json.JSONObject;
import java.io.File;
import android.util.Log;

public class BookmarksHelper {

    private static JSONArray bmFiles=new JSONArray();
    private static String prefixOfJSONFile="bm_";
    private static String defaultName="bookmarks";

    public static void useBookmarks(String name){
        if(name==null)name=defaultName;
        JSONArray jsonArray=null;
        String jsonfileNewName=prefixOfJSONFile+name+".json";
        File jsonfileFile=new File(DeviceAPI.appdir,jsonfileNewName);
        if(!jsonfileFile.exists()){
            DeviceAPI.saveTextFile("[]",jsonfileFile);
            jsonArray=new JSONArray();
        }else{
            try{
                jsonArray=(JSONArray)DeviceAPI.getJSONFromFile(jsonfileFile);
            }catch(Exception e){}
        }
        try{
            JSONObject dic=new JSONObject();
            dic.put("name",name);
            dic.put("object",jsonArray);
            bmFiles.put(dic);
        }catch(Exception e){}
    }

    public static JSONArray getBookmarks(String name){
        if(name==null)name=defaultName;
        try{
            for(int i=0; i<bmFiles.length(); i++){
                if(bmFiles.getJSONObject(i).getString("name").equals(name))
                    return bmFiles.getJSONObject(i).getJSONArray("object");
            }
        }catch(Exception e){}
        return null;
    }

    public static String getBookmarksJSONString(String name){
        if(name==null)name=defaultName;
        try{
            return getBookmarks(name).toString();
        }catch(Exception e){}
        return null;
    }

    private static void updateJsonOnDevice(String name, JSONArray mArr){
        if(name==null)name=defaultName;
        String jsonfileNewName=prefixOfJSONFile+name+".json";
        File jsonfileFile=new File(DeviceAPI.appdir,jsonfileNewName);
        DeviceAPI.saveJSONFile(mArr, jsonfileFile);
        try{
            for(int i=0; i<bmFiles.length(); i++){
                if(bmFiles.getJSONObject(i).getString("name").equals(name)){
                    bmFiles.remove(i);
                    break;
                }
            }
        }catch(Exception e){}
        useBookmarks(name);
    }

    public static void addBookmarkWithInt(String name, int intId){
        JSONArray mArr=getBookmarks(name);
        mArr.put(intId);
        updateJsonOnDevice(name, mArr);
    }

    public static void addBookmarkWithString(String name, String stringId){
        JSONArray mArr=getBookmarks(name);
        mArr.put(stringId);
        updateJsonOnDevice(name, mArr);
    }

    public static void removeBookmarkAtIndex(String name, int index){
        JSONArray mArr=getBookmarks(name);
        mArr.remove(index);
        updateJsonOnDevice(name, mArr);
    }

    public static void removeBookmarkWithInt(String name, int intId){
        JSONArray mArr=getBookmarks(name);
        mArr.put(intId);
        try{
            JSONArray newArr=new JSONArray();
            for(int i=0; i<mArr.length(); i++){
                if(mArr.getInt(i)!=intId){newArr.put(mArr.get(i));}
            }
            mArr=newArr;
            updateJsonOnDevice(name, newArr);
        }catch(Exception e){}
    }

    public static void removeBookmarkWithString(String name, String stringId){
        JSONArray mArr=getBookmarks(name);
        mArr.put(stringId);
        try{
            JSONArray newArr=new JSONArray();
            for(int i=0; i<mArr.length(); i++){
                if(!mArr.getString(i).equals(stringId)){newArr.put(mArr.get(i));}
            }
            mArr=newArr;
            updateJsonOnDevice(name, newArr);
        }catch(Exception e){}
    }

    public static void removeAllBookmarks(String name){
        JSONArray mArr=getBookmarks(name);
        try{
            for(int i=mArr.length()-1; i>=0; i--){mArr.remove(i);}
            updateJsonOnDevice(name, new JSONArray("[]"));
        }catch(Exception e){}
    }

    public static boolean isAlreadyAddedToBookmarksWithInt(String name, int intId){
        if(name==null)name=defaultName;
        JSONArray mArr=getBookmarks(name);
        try{
            for(int i=0; i<mArr.length(); i++){
                if(mArr.getInt(i)==intId)return true;
            }
        }catch(Exception e){}
        return false;
    }

    public static boolean isAlreadyAddedToBookmarksWithString(String name, String stringId){
        if(name==null)name=defaultName;
        JSONArray mArr=getBookmarks(name);
        try{
            for(int i=0; i<mArr.length(); i++){
                if(mArr.getString(i).equals(stringId))return true;
            }
        }catch(Exception e){}
        return false;
    }

}