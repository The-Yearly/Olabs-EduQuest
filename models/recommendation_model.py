import requests

YOUTUBE_API_KEY = "AIzaSyAHsPe1Dz4ruKDGV710qdeX5DPjMTrpdYA"
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

def generate_recommendations(data):
    progress = data.get("progress", 50)
    learning_style = data.get("learning_style", "visual")
    academic_goals = data.get("academic_goals", [])
    preferred_content_types = data.get("preferred_content_types", [])

    search_query = f"{' '.join(academic_goals)} {learning_style} {progress}% learning"
    
    params = {
    "part": "snippet",
    "q": search_query,
    "key": YOUTUBE_API_KEY,
    "maxResults": 10,  # Increase to 10 videos
    "type": "video",
    "videoEmbeddable": "true"
}


    response = requests.get(YOUTUBE_SEARCH_URL, params=params)
    video_data = response.json()

    recommendations = []
    if "items" in video_data:
        for item in video_data["items"]:
            recommendations.append({
                "title": item["snippet"]["title"],
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"]
            })
    
    return recommendations
