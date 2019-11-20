package se.highex.simple.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "hotel")
public class Hotel
{
    @Id
    @NotNull
    @Column(name = "ID")
    @SequenceGenerator(name="hotel_seq", sequenceName="hotel_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="hotel_seq")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SHORTNAME")
    private String shortName;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "CITY")
    private String city;

    @Column(name = "RATING")
    private String rating;

    @Column(name = "SITE")
    private String site;

    public Hotel()
    {
    }

    public Hotel(String name, String billerMode, String ebbpUserCode, String city, String rating, String site)
    {
        this.name = name;
        this.shortName = billerMode;
        this.country = ebbpUserCode;
        this.city = city;
        this.rating = rating;
        this.site = site;
    }

    public Long getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getShortName()
    {
        return shortName;
    }

    public void setShortName(String shortName)
    {
        this.shortName = shortName;
    }

    public String getCountry()
    {
        return country;
    }

    public void setCountry(String country)
    {
        this.country = country;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public String getRating()
    {
        return rating;
    }

    public void setRating(String rating)
    {
        this.rating = rating;
    }

    public void setSite(String site)
    {
        this.site = site;
    }

    public String getSite()
    {
        return this.site;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hotel hotel = (Hotel) o;
        return Objects.equals(id, hotel.id) &&
                Objects.equals(name, hotel.name) &&
                Objects.equals(shortName, hotel.shortName) &&
                Objects.equals(country, hotel.country) &&
                Objects.equals(city, hotel.city) &&
                Objects.equals(site, hotel.site) &&
                Objects.equals(rating, hotel.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, site, name, shortName, country, city, rating);
    }

    @Override
    public String toString() {
        return "Hotel{" +
                "id=" + id +
                ", site='" + site + '\'' +
                ", name='" + name + '\'' +
                ", shortName='" + shortName + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
