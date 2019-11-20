package se.highex.simple.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "RECALL")
public class Recall
{
    @Id
    @NotNull
    @Column(name = "ID")
    @SequenceGenerator(name="RECALL_SEQ", sequenceName="RECALL_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="RECALL_SEQ")
    private Long id;

    @Column(name = "DATEVISITE")
    private Date date;

    @Column(name = "RATING")
    private String rating;

    @Column(name = "DESCRIPTION")
    private String desc;

    public Recall()
    {
    }
    
    public Recall(Date date, String rating, String desc)
    {
        this.date = date;
        this.rating = rating;
        this.desc = desc;
    }

    public Long getId()
    {
        return id;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public String getRating()
    {
        return rating;
    }

    public void setRating(String rating)
    {
        this.rating = rating;
    }

    public String getDescription()
    {
        return desc;
    }

    public void setDescription(String desc)
    {
        this.desc = desc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recall that = (Recall) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(date, that.date) &&
                Objects.equals(desc, that.desc) &&
                Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, desc, rating);
    }

    @Override
    public String toString() {
        return "Recall{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", desc='" + desc + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
