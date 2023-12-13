import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter=createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})//to transform data into entity id type i.e; normalizing data for easy lookup

const inititalState=userAdapter.getInitialState()

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
        query:()=>'/users',
        validateStatus:(response,result)=>{
            return response.status===200&&!result.isError
        },
        keepUnusedDataFor:60,
        //transformResponse is important specially because we get data from mongoDB and we need to transform response before we use it.
        //in mongodb especially id is represented as ._id
        transformResponse:responseData=>{
            const loadedUsers=responseData.map(user=>{
                user.id=user._id
                return user
            })
            //setting the transformed data into userAdapter
            return userAdapter.setAll(inititalState,loadedUsers)
        },
        providedTags:(result,error,arg)=>{//tags that can be invalidated
            if(result?.ids){//if there is ids property in result
                return[
                    {type:'User',id:'LIST'},
                    ...result.ids.map(id=>({type:'User',id}))//creating caching tags for each 'id'
                ]

            }else return[{type:'User',id:'LIST'}]//this is to say that if result is null, dont throw a error and return tags

        }

    }),
    addNewUser: builder.mutation({
        query: initialUserData=>({//for getter method, method and body attibutes need not be specifies as above for getUsers
            url:'/users',
            method:'POST',
            body:{
                ...initialUserData,
            }
        }),
        invalidatesTags:[{type:'User',id:"LIST"}]

    }),
    updateUser: builder.mutation({
        query: initialUserData=>({//for getter method, method and body attibutes need not be specifies as above for getUsers
            url:'/users',
            method:'PATCH',
            body:{
                ...initialUserData,
            }
        }),
        invalidatesTags:(result,error,arg)=>[{type:'User',id:arg.id}]

    }),
    deleteUser: builder.mutation({
        query: ({id})=>({//for getter method, method and body attibutes need not be specifies as above for getUsers
            url:'/users',
            method:'DELETE',
            body:{
                id
            }
        }),
        invalidatesTags:(result,error,arg)=>[{type:'User',id:arg.id}]

    }),

    })
})

export const{
    useGetUsersQuery,//created automatically i.e; when you are trying to type, shows in recommendations
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
}=usersApiSlice

//returns query result object
export const selectUsersResult=usersApiSlice.endpoints.getUsers.select()

//create memoized selector
const selectUsersData=createSelector(
    selectUsersResult,
    userResult=>userResult.data//normalized state object with ids and entities
)

//getSelector creates these selectors and we rename them with aliases using destructuring

export const{
    selectAll:selectAllUsers,
    selectById:selectUserById,
    selelectIds:selectUserIds
}=userAdapter.getSelectors(state=>selectUsersData(state)??inititalState)

//automatic selectgetusers created, from endpoints create a selector, create selector extracting data, using getSelector rename the autoatically created once