package com.chat.firebase.irahavoi.firebasechat;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.List;

/**
 * Created by irahavoi on 2016-06-06.
 */
public class MessageAdapter extends RecyclerView.Adapter<MessageAdapter.ViewHolder> {
    private List<Message> messages;

    public static class ViewHolder extends RecyclerView.ViewHolder{
        public TextView author;
        public TextView msg;

        public ViewHolder(View v){
            super(v);
        }

        public void setMsg(TextView msg){
            this.msg = msg;
        }

        public void setAuthor(TextView author){
            this.author = author;
        }
    }

    // Create new views (invoked by the layout manager)
    @Override
    public MessageAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.msg_layout, parent, false);

        ViewHolder vh = new ViewHolder(v);

        TextView msgView = (TextView) v.findViewById(R.id.msg);
        TextView authorView = (TextView) v.findViewById(R.id.author);

        vh.setMsg(msgView);
        vh.setAuthor(authorView);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        if(messages.size() > position && messages.get(position) != null){
            holder.msg.setText(messages.get(position).getMessage());
            holder.author.setText(messages.get(position).getAuthor());
        }

    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    public MessageAdapter(List<Message> messages){
        this.messages = messages;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
