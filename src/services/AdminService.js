// 검색어 업데이트 함수
const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // 검색어를 사용하여 목록 필터링
  const filteredMembers = studyMembers.filter((member) =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
    const getStudyMembers = async (studyRoomId) => {
      try {
        const response = await fetch(`http://localhost:8081/api/v1/study/${studyRoomId}/memberlistandstatus` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.token}`
          }
        });
        if (!response.ok) {
          console.error("Error response:", response);
          return [];  
        }
        const data = await response.json();
        return data.data; 
      } catch (error) {
        console.error("Error fetching study members:", error);
        return [];  // If there's an error, return an empty array
      }
    };
    
  
    const updateRole = async (studyId, userId) => {
      try {
        // studyMembers array에서 멤버 찾기
        const member = studyMembers.find((member) => member.user_id === userId);
    
        if (!member) {
          console.error("Member not found:", userId);
          return;
        }
    
        // Determine the new role based on the current role
        const newRole = member.created_by === member.user_id ? "group_member" : "group_leader";
    
        // Send PUT request to update role
        await fetch(`http://localhost:8081/api/admin/v1/study-member/${studyId}/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.token}`
          },
          body: JSON.stringify({
            role: newRole  
          }),
        });
    
        // Fetch updated study members after role update
        const members = await getStudyMembers(studyRoomId);
        setStudyMembers(members);
      } catch (error) {
        console.error("Error updating role:", error);
      }
    };
    
    
  